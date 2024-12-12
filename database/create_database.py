import sqlite3
import numpy as np
import pandas as pd
import os

if not os.path.exists('files/remindall.db'):
    connection = sqlite3.connect('files/remindall.db')

    cursor = connection.cursor()

    cursor.execute('CREATE TABLE IF NOT EXISTS academic (id INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT, time TEXT, duration TEXT, type TEXT, desc TEXT)')
    cursor.execute('CREATE TABLE IF NOT EXISTS sports (id INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT, time TEXT, type TEXT, duration TEXT, desc TEXT)')
    cursor.execute('CREATE TABLE IF NOT EXISTS general (id INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT, time TEXT, duration TEXT, desc TEXT)')
    cursor.execute('CREATE TABLE IF NOT EXISTS calories (item TEXT, amount TEXT, calorie REAL, PRIMARY KEY (item, amount))')

    df = pd.read_csv('files/calories.csv')
    data = df.values[:, :3]
    for row in data:
        cursor.execute('INSERT INTO calories (item, amount, calorie) VALUES (?, ?, ?)', tuple(row))

    connection.commit()
    connection.close()