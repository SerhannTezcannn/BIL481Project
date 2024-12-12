from fastapi import FastAPI, WebSocket, HTTPException
from pydantic import BaseModel
from database.db_connections import addAcademic, addGeneral, addSports, getAcademic, getGeneral, getSports, removeAcademic, removeGeneral, removeSports

app = FastAPI()

# Pydantic model (JSON schema)
class Reminder(BaseModel):
    day: str
    time: str
    duration: str
    desc: str

# Academic Endpoints
@app.post("/academic/")
def add_academic(reminder: Reminder):
    success = addAcademic(reminder.day, reminder.start_time, reminder.end_time, reminder.type, reminder.desc)
    if success:
        return {"message": "Academic reminder added successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to add academic reminder")

@app.get("/academic/")
def get_academic():
    try:
        data = getAcademic()
        return {"academic_reminders": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/academic/")
def delete_academic(reminder: Reminder):
    success = removeAcademic(reminder.day, reminder.time)
    if success:
        return {"message": "Academic reminder deleted successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to delete academic reminder")

# General Endpoints
@app.post("/general/")
def add_general(reminder: Reminder):
    success = addGeneral(reminder.day, reminder.time, reminder.duration, reminder.desc)
    if success:
        return {"message": "General reminder added successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to add general reminder")

@app.get("/general/")
def get_general():
    try:
        data = getGeneral()
        return {"general_reminders": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/general/")
def delete_general(reminder: Reminder):
    success = removeGeneral(reminder.day, reminder.time)
    if success:
        return {"message": "General reminder deleted successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to delete general reminder")

# Sports Endpoints
@app.post("/sports/")
def add_sports(reminder: Reminder):
    success = addSports(reminder.day, reminder.time, reminder.duration, reminder.desc)
    if success:
        return {"message": "Sports reminder added successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to add sports reminder")

@app.get("/sports/")
def get_sports():
    try:
        data = getSports()
        return {"sports_reminders": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/sports/")
def delete_sports(reminder: Reminder):
    success = removeSports(reminder.day, reminder.time)
    if success:
        return {"message": "Sports reminder deleted successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to delete sports reminder")
