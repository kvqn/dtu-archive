from . import Paths
import re

REMOVE_REGEXES = [
    r"^ *Delhi +Technological +University *$",
    r"^ *\(.*$",
    r"^ *\( *Formerly +Delhi +College +of +Engineering *\) *$",
    r"^ *Regular +Result +Notification *$",
    r"^ *THE +RESULT.*$",
    r"^ *Program.*$",
    r"^ *Branch.*$",
    r"^ *[A-Z]+[0-9]* +:.*$",
    r"^ *Credits.*$",
    r"^ *Any +discrepancy.*$",
    r"^ *Digitally +Signed.*$",
    r"^ *Controller.*$",
    r"^ *Date.*$",
    r"^ *valid +only.*$",
    r"^ *Visit.*$",
    r"^ *Sem +:.*$",
    r"^ *PRESENTATION +SKILLS.*$",
    r"^ *4 +4 + 4+.*$",
    r"^ *HARMONY.*$", # if someone has this name i will cry
    r"^ *MANAGEMENT.*$",
]

def declutter():
    with open(Paths.TEXT, "r") as file:
        with open(Paths.TEXT_DECLUTTERED, "w") as file2:
            while True:
                line = file.readline()
                if not line:
                    break
                for regex in REMOVE_REGEXES:
                    line = re.sub(regex, "", line)
                file2.write(line)
        