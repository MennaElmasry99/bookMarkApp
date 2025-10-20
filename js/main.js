// general variables
var bookmarkNameInput = document.getElementById("bookmarkName");
var webSiteUrlInput = document.getElementById("webSiteUrl");
var tableBody = document.getElementById("tableBody");
var bookmarkList = [];

// load from localStorage if exists
if (localStorage.getItem("bookmarkList") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmark();
}

// regex patterns
var nameRegex = /^[A-Za-z ]{3,}$/; 
var urlRegex = /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/;


// add url function
function addUrl() {
var nameValue = bookmarkNameInput.value.trim();
  var urlValue = webSiteUrlInput.value.trim();

  // validation
  if (!nameRegex.test(nameValue)) {
    alert("Bookmark name must contain at least 3 letters and only letters/spaces.");
    return;
  }

  if (!urlRegex.test(urlValue)) {
    alert("Please enter a valid URL (e.g. https://example.com)");
    return;
  }

  var urlObject = {
    name: bookmarkNameInput.value.trim(),
    url: webSiteUrlInput.value.trim()
  };

  if (urlObject.name && urlObject.url) {
    bookmarkList.push(urlObject);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayBookmark();
    clearInputs();
  } else {
    alert("Please fill out both fields!");
  }
}

// clear inputs
function clearInputs() {
  bookmarkNameInput.value = "";
  webSiteUrlInput.value = "";
}

// display bookmark function
function displayBookmark() {
  var trs = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    trs += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].name}</td>
        <td>
          <a href="${bookmarkList[i].url}" target="_blank" class="btn btn-success text-white">
            <i class="fa-solid fa-eye pe-2"></i> Visit
          </a>
        </td>
        <td>
          <button type="button" class="btn btn-danger text-white" onclick="deleteUrl(${i})">
            <i class="fa-solid fa-trash pe-2"></i> Delete
          </button>
        </td>
      </tr>`;
  }
  tableBody.innerHTML = trs;
}

// delete url
function deleteUrl(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmark();
}
