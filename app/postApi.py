from fastapi import FastAPI
import json
import os

app = FastAPI()

@app.get("/home")
def get():
    return {"message":"i am full stack developer"}

FILE_NAME = "data.json"

def check():
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as f:
            return json.load(f)
    return []
        
def save(users):
    with open(FILE_NAME, "w") as f:
        json.dump(users,f, indent=4)

@app.post("/Registration")

def post(data: dict):
    users = check()
    if data in users:
        return {"message": "Data already exists"}
    users.append(data)
    save(users)
    return {"message": "Done",}