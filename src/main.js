import "./style.css";
import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b914ee001a5b7e6f8a");

const databases = new Databases(client);

const form = document.querySelector("form");

const addJob = (e) => {
  e.preventDefault();
  const job = databases.createDocument(
    "67b915ac0019372fb537",
    "67b915cf00201a13371a",
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

async function addJobsToDom() {
  let response = await databases.listDocuments(
    "67b915ac0019372fb537",
    "67b915cf00201a13371a"
  );

  response.documents.forEach((job) => {
    const li = document.createElement("li");
    li.textContent = `${job["company-name"]} ${job["date-added"]} ${job["role"]} ${job["location"]} ${job["position-type"]} ${job["source"]}`;
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
//   "67b915ac0019372fb537",
//   "67b915cf00201a13371a",
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
