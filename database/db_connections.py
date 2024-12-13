import sqlite3

PATH = '/home/kerem/codes/BIL481Project/database/files/remindall.db'

def addAcademic(day : str, st : str, et: str, type : str, desc : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, st, et, type, desc)
    try:
        cursor.execute('INSERT INTO academic (day, start_time, end_time, type, desc) VALUES (?, ?, ?, ?, ?)', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False
    
def addGeneral(day : str, st : str, et: str, name : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, st, et, name)
    try:
        cursor.execute('INSERT INTO general (day, start_time, end_time, desc) VALUES (?, ?, ?, ?)', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False
    
def addSports(day : str, st : str, et: str, type : str, name : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, st, et, type, name)
    try:
        cursor.execute('INSERT INTO sports (day, start_time, end_time, type, desc) VALUES (?, ?, ?, ?, ?)', tuple(row))
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

def getCalorie():
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM calories')
    data = cursor.fetchall()
    connection.close()
    return data

def removeAcademic(day : str, time : str, desc : str) -> bool:
    connection = sqlite3.connect(PATH)
    cursor = connection.cursor()
    row = (day, time, desc)
    try:
        cursor.execute('DELETE FROM academic WHERE day = ? AND start_time = ? AND desc = ?', tuple(row))
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
        cursor.execute('DELETE FROM general WHERE day = ? AND start_time = ? AND desc = ?', tuple(row))
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
        cursor.execute('DELETE FROM sports WHERE day = ? AND start_time = ? AND type = ?', tuple(row))
        connection.commit()
        connection.close()
        return True
    except:
        return False