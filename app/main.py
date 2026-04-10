from fastapi import FastAPI

app=FastAPI()

@app.get("/helloWorld")
def check_hello_world():
    return {"message":"Hello World !"}