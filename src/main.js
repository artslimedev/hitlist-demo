import "./style.css";
import { Client, Databases, ID } from "appwrite";
import { DATABASE_ID, PROJECT_ID, COLLECTION_ID } from "./shh";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);

const form = document.querySelector("form");

const addJob = (e) => {
  e.preventDefault();
  const job = databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    {
      "company-name": e.target.companyName.value,
      "date-added": e.target.dateAdded.value,
      role: e.target.role.value,
      location: e.target.location.value,
      "position-type": e.target.positionType.value,
      source: e.target.source.value,
    }
  );
  job.then(
    function (response) {
      addJobsToDom();
    },
    function (error) {
      console.log(error);
    }
  );
  form.reset();
};

form.addEventListener("submit", addJob);

const removeJob = async (id) => {
  const result = await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  document.getElementById(id).remove();
};

const updateChat = async (id) => {
  const result = databases.updateDocument(
    DATABASE_ID, // databaseId
    COLLECTION_ID, // collectionId
    "id", // documentId
    { chat: true } // data (optional)
    // permissions (optional)
  );
  result.then(() => location.reload());
};

async function addJobsToDom() {
  document.querySelector("ul").innerHTML = "";
  let response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

  response.documents.forEach((job) => {
    const li = document.createElement("li");
    li.textContent = `${job["company-name"]} ${job["date-added"]} ${job["role"]} ${job["location"]} ${job["position-type"]} ${job["source"]} coffee chat? ${job["chat"]}`;

    li.id = job.$id;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🧨";
    deleteBtn.onclick = () => removeJob(job.$id);

    const teaBtn = document.createElement("button");
    teaBtn.textContent = "🍵";
    teaBtn.onClick = () => updateChat(job.$id);

    li.appendChild(teaBtn);
    li.appendChild(deleteBtn);

    document.querySelector("ul").appendChild(li);
  });

  // promise.then(
  //   function (response) {
  //     console.log(response);
  //   },
  //   function (error) {
  //     console.log(error);
  //   }
  // );
}

addJobsToDom();

// const promise = databases.createDocument(
//   DATABASE_ID,
//   COLLECTION_ID,
//   ID.unique(),
//   {
//     "company-name": "100Devs",
//     "date-added": new Date(),
//     role: "Software Engineer",
//     location: "Philly",
//     "position-type": "Full-Time",
//     source: "https://100devs.org",
//   }
// );

// promise.then(
//   function (response) {
//     console.log(response);
//   },
//   function (error) {
//     console.log(error);
//   }
// );
