import sqlite3

PATH = '/home/kerem/codes/481/database/files/remindall.db'

def addAcademic(day : str, time : str, dur: str, type : str, name : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, time, dur, type, name)
    try:
        cursor.execute('INSERT INTO academic (day, time, duration, type, desc) VALUES (?, ?, ?, ?, ?)', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False
    
def addGeneral(day : str, time : str, dur: str, name : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, time, dur, name)
    try:
        cursor.execute('INSERT INTO general (day, time, duration, desc) VALUES (?, ?, ?, ?)', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False
    
def addSports(day : str, time : str, dur: str, type : str, name : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, time, dur, type, name)
    try:
        cursor.execute('INSERT INTO sports (day, time, duration, desc) VALUES (?, ?, ?, ?, ?)', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False
    
def getSports():
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM sports')
    data = cursor.fetchall()
    connection.close()
    return data

def getAcademic():
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM academic')
    data = cursor.fetchall()
    connection.close()
    return data

def getGeneral():
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM general')
    data = cursor.fetchall()
    connection.close()
    return data

def getCalorie(name : str, amount : str):
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    cursor.execute('SELECT calorie FROM calories WHERE item = ? AND amount = ?', (name, amount))
    data = cursor.fetchall()
    connection.close()
    return data

def removeAcademic(day : str, time : str, desc : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, time, desc)
    try:
        cursor.execute('DELETE FROM academic WHERE day = ? AND time = ? AND desc = ?', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False
    
def removeGeneral(day : str, time : str, desc : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, time, desc)
    try:
        cursor.execute('DELETE FROM general WHERE day = ? AND time = ? AND desc = ?', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False
    
def removeSports(day : str, time : str, type : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, time, type)
    try:
        cursor.execute('DELETE FROM sports WHERE day = ? AND time = ? AND type = ?', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False