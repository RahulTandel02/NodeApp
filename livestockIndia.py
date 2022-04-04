import collections
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient


def checkUpdate(data):
    for i in s:
        if i["content"] == data["content"]:
            print(data["title"])
            return False
        else:
            if i["title"] == data["title"]:
                collection.update_one(
                    {"title": data["title"]},
                    {
                        "$set": {"content": data["content"]},
                        "$currentDate": {"lastModified": True},
                    },
                )
            return False
    return True


def enterInDataBase(data):
    if checkUpdate(data):
        s = collection.insert_one(data)
        print(s.inserted_id)


def scrape(url):
    try:
        source = requests.get(url)
        soup = BeautifulSoup(source.text, "html.parser")
        section = soup.find("div", id="texttospeak")
        if section.find("div", class_="content-headings"):
            head = section.find("h3").text
            if head not in titles:
                titles.append(head)
                data = {
                    "title": head,
                    "content": str(soup.find("div", id="texttospeak")),
                }
                enterInDataBase(data)
            return allLinks

        links = section.find_all("a", class_="folderfile_name")
        for l in links:
            # print(scarpped)
            link = urll + l.get("href")
            if link not in scarpped:
                scarpped.add(link)
                allLinks.append(link)
                while len(allLinks) != 0:
                    res = scrape(link)
                    for r in res:
                        if r not in allLinks:
                            allLinks.append(r)
                        else:
                            allLinks.remove(r)
            else:
                allLinks.remove(link)

        return allLinks

    except Exception as e:
        print(e)


cam = []
conn = MongoClient(
    "mongodb+srv://New-User_01:mongopassword@cluster0.yk2o2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = conn["App"]
collection = db["blog"]
s = collection.find()
scarpped = set()
allLinks = []
titles = []
urll = "https://vikaspedia.in"
scrape("https://vikaspedia.in/agriculture/livestock")
