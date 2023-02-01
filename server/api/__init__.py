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
            "rows": [
                {
                    "roll" : 1,
                    "name": "John",
                    "cgpa": 8.5
                    }
                ]
            }
