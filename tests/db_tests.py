#these are obsolete and will not work, look at the code for proper inputs of these functions
from database.db_connections import * 

print(addAcademic("Monday", "16.30", "120", "Exam"))
print(addAcademic("Tuesday", "16.30", "120", "Exam"))
print(addAcademic("Wednesday", "16.30", "120", "Exam"))

print(addSports("Monday", "16.30", "120", "Exam"))
print(addSports("Tuesday", "16.30", "120", "Exam"))
print(addSports("Wednesday", "16.30", "120", "Exam"))

print(addGeneral("Monday", "16.30", "120", "Exam"))
print(addGeneral("Tuesday", "16.30", "120", "Exam"))
print(addGeneral("Wednesday", "16.30", "120", "Exam"))

print(getCalorie('Vienna Sausage', '1 Sausag'))
print(getGeneral())
print(getSports())
print(getAcademic())

print(removeAcademic("Monday", "16.30"))
print(removeAcademic("Tuesday", "16.30"))
print(removeAcademic("Wednesday", "16.30"))

print(removeSports("Monday", "16.30"))
print(removeSports("Tuesday", "16.30"))
print(removeSports("Wednesday", "16.30"))

print(removeGeneral("Monday", "16.30"))
print(removeGeneral("Tuesday", "16.30"))
print(removeGeneral("Wednesday", "16.30"))

print(getGeneral())
print(getSports())
print(getAcademic())