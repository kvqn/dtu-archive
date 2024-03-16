"use client";

import { FileViewerUsingName } from "../../components/FileViewer";
import { MySplit } from "@/components/MySplit/MySplit";
import { heartFile } from "@/server/heartFile";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faEye,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

function displayType(type: string): string {
  if (type === "MID_TERM_QUESTIONS") return "Mid Term Questions";
  if (type === "END_TERM_QUESTIONS") return "End Term Questions";
  if (type === "MID_TERM_ANSWERS") return "Mid Term Answers";
  if (type === "END_TERM_ANSWERS") return "End Term Answers";
  if (type === "SUPPLEMENTARY_QUESTIONS") return "Supplementary Questions";
  else return "";
}
export function PDFSelector({
  PYQs,
  show_upload,
  userHeartsIds,
}: {
  PYQs: Prisma.pyqGetPayload<{
    include: {
      uploadedBy: true;
      file: {
        select: {
          _count: {
            select: {
              FileHearts: true;
              FileViews: true;
            };
          };
          id: true;
          createdAt: true;
          type: true;
          name: true;
        };
      };
    };
  }>[];
  show_upload: boolean;
  userHeartsIds: number[];
}) {
  const { data: session } = useSession();
  const [activeFileName, setActiveFileName] = useState<string | null>(null);

  const [filteredPYQs, setFilteredPYQs] = useState(PYQs);

  const [filter_subjectCode, setFilter_subjectCode] = useState<string>("");
  const [filter_subjectName, setFilter_subjectName] = useState<string>("");
  const [filter_year, setFilter_year] = useState<number | null>(null);
  const [filter_type, setFilter_type] = useState<string>("ALL");

  const [_renderCount, forceRender] = useState(0);

  useEffect(() => {
    const filtered = PYQs.filter((pyq) => {
      return (
        pyq.subject_code
          .toLowerCase()
          .includes(filter_subjectCode.toLowerCase()) &&
        pyq.subject_name
          .toLowerCase()
          .includes(filter_subjectName.toLowerCase()) &&
        (filter_year === null || pyq.year === filter_year) &&
        (filter_type == "ALL" || pyq.type === filter_type)
      );
    });
    setFilteredPYQs(filtered);
  }, [filter_subjectCode, filter_subjectName, filter_year, filter_type, PYQs]);

  return (
    <div className="px-[5%]">
      <div className="mt-4 flex flex-wrap items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="font-geist text-lg font-semibold">Subject Code</div>
          <input
            type="text"
            className="h-10 rounded-lg border text-center hover:border-slate-300 dark:border-[#363b3d]"
            onChange={(e) => {
              setFilter_subjectCode(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-geist text-lg font-semibold">Subject Name</div>
          <input
            type="text"
            className="h-10 rounded-lg border text-center hover:border-slate-300 dark:border-[#363b3d]"
            onChange={(e) => {
              setFilter_subjectName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-geist text-lg font-semibold">Year</div>
          <input
            type="number"
            className="h-10 rounded-lg border text-center [appearance:textfield] hover:border-slate-300 dark:border-[#363b3d] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={(e) => {
              const year = e.target.value ? parseInt(e.target.value) : null;
              setFilter_year(year);
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-geist text-lg font-semibold">Type</div>
          <select
            className="h-10 rounded-lg text-center"
            onChange={(e) => {
              setFilter_type(e.target.value);
            }}
          >
            <option value="ALL">All</option>
            <option value="MID_TERM_QUESTIONS">Mid Term Questions</option>
            <option value="END_TERM_QUESTIONS">End Term Questions</option>
            <option value="MID_TERM_ANSWERS">Mid Term Answers</option>
            <option value="END_TERM_ANSWERS">End Term Answers</option>
            <option value="SUPPLEMENTARY_QUESTIONS">
              Supplementary Questions
            </option>
          </select>
        </div>
        {show_upload && (
          <Link
            href="/pyqs/upload"
            className="mx-8 my-4 cursor-pointer rounded-xl border bg-green-300 px-3 py-2 text-xl transition-colors hover:bg-green-400 dark:bg-[#1c985d]"
          >
            Upload
          </Link>
        )}
      </div>
      <MySplit
        direction="horizontal"
        className="flex h-full justify-between gap-[2%] py-4 font-geist"
      >
        <div className="flex h-[80vh] w-full flex-col gap-2 overflow-y-auto pr-2">
          {filteredPYQs.map((pyq, index) => (
            <div
              key={index}
              className={twMerge(
                "flex cursor-pointer justify-between rounded-xl border bg-[#e9edef] text-xs transition-colors dark:border-[#363b3d] dark:bg-[#1f272b] lg:text-base",
                pyq.file.name === activeFileName
                  ? "border-2 border-black bg-gray-200 dark:bg-[#25282a]"
                  : "hover:bg-gray-200"
              )}
              onClick={() => {
                if (isMobile) {
                  window.open(`/api/pyq/${pyq.fileId}`);
                } else {
                  if (pyq.file.name === activeFileName) return;
                  pyq.file._count.FileViews++;
                  setActiveFileName(pyq.file.name);
                }
              }}
            >
              <div className="flex w-full flex-col p-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <p>{pyq.subject_name}</p>
                  </div>
                  <div>{pyq.year}</div>
                </div>
                <div className="flex items-center justify-between text-right">
                  <div>{pyq.subject_code}</div>
                  <div className="rounded border bg-[#f9f9f9] px-1 shadow-sm dark:border-[#353a3c] dark:bg-[#1b1e1f]">
                    {displayType(pyq.type)}
                  </div>
                </div>
              </div>
              <div className="ml-2 flex w-20 flex-col overflow-hidden rounded-r-xl border-l border-gray-400 bg-gray-50 p-4 dark:border-[#363b3d] dark:bg-[#1b1d1e]">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-black dark:text-white"
                  />
                  <div>{pyq.file._count.FileViews}</div>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    async function _() {
                      if (!session)
                        toast.error("You need to be logged in to heart a PYQ");
                      else {
                        if (userHeartsIds.includes(pyq.fileId)) {
                          pyq.file._count.FileHearts--;
                          const _index = userHeartsIds.findIndex(
                            (id) => id === pyq.fileId
                          );
                          userHeartsIds.splice(_index, 1);
                          forceRender(_renderCount + 1);
                          const success = await heartFile(pyq.fileId, session);
                          if (success) {
                            toast.success("PYQ un-hearted");
                          } else {
                            pyq.file._count.FileHearts++;
                            userHeartsIds.push(pyq.fileId);
                            forceRender(_renderCount + 1);
                            toast.error("Error un-hearting PYQ");
                          }
                        } else {
                          pyq.file._count.FileHearts++;
                          userHeartsIds.push(pyq.fileId);
                          forceRender(_renderCount + 1);
                          const success = await heartFile(pyq.fileId, session);
                          if (success) {
                            toast.success("PYQ hearted");
                          } else {
                            pyq.file._count.FileHearts--;
                            const _index = userHeartsIds.findIndex(
                              (id) => id === pyq.fileId
                            );
                            userHeartsIds.splice(_index, 1);
                            forceRender(_renderCount + 1);
                            toast.error("Error hearting PYQ");
                          }
                        }
                      }
                    }
                    _();
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      userHeartsIds.includes(pyq.fileId)
                        ? faHeartSolid
                        : faHeartRegular
                    }
                    className="text-black dark:text-white"
                  />
                  <div>{pyq.file._count.FileHearts}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative hidden w-full border dark:border-[#363b3d] lg:block">
          {activeFileName != null ? (
            <FileViewerUsingName name={activeFileName} />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <p className="font-bold">Select a PYQ</p>
              <p>Preview will show here</p>
            </div>
          )}
        </div>
      </MySplit>
    </div>
  );
}
