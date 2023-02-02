from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/all")
def get_all():
    return {
            "students": [
                {
                    "roll" : 1,
                    "name": "John",
                    "cgpa": 8.5
                    }
                ]
            }

@app.get("/sem1")
def get_sem1(branch : str | None = None):
    from .sem1 import get_sem1_results
    return get_sem1_results(branch)
