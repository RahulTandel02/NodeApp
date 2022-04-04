from pymongo import MongoClient

data = []
con = MongoClient("mongodb://localhost:27017/")
db = con["test"]
collection = db["NewTest"]
s = collection.find()
collection.delete_many


st = "<h2>Hello</h2>"
st2 = "<h2>World</h2>"

a = {1: ["1", st], 2: ["2", st2]}


def chechUpdate(data):
    for i in s:
        if i["content"] == data["content"]:
            print(data["content"])
            return True
        else:
            if i["title"] == data["title"]:
                collection.update_one(
                    {"title": data["title"]},
                    {
                        "$set": {"content": data["content"]},
                        "$currentDate": {"lastModified": True},
                    },
                )
                return True
    return False


for i in range(1, len(a) + 1):
    data = {"title": a[i][0], "content": a[i][1]}
    if chechUpdate(data) == False:
        d = collection.insert_one(data)
        print(d.inserted_id)
