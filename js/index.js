var webSiteName = document.getElementById("webSiteName");
var webSiteUrl = document.getElementById("webSiteUrl");
var tableBody = document.getElementById("tableBody");
var urlList;



if (localStorage.getItem("urlList") !== null) {
    urlList = JSON.parse(localStorage.getItem("urlList"));
    display(urlList);
} else {
    urlList = [];
}

var regex = {
    webSiteName: /^[A-Z][a-z]{3,8}$/,
    webSiteUrl: /^(https?|ftp):\/\/(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.)(?:[A-Z0-9-]{2,})?(?::\d+)?(\/[^\s]*)?(?:\?[;&a-z\d%_.~+=-]*)?(?:#[^\s]*)?$/i,
};
function validName(element) {
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
    }
};


function addUrl() {
    if (
        regex.webSiteName.test(webSiteName.value) == true &&
        regex.webSiteUrl.test(webSiteUrl.value) == true
    ) {
        for (var i = 0; i < urlList.length; i++) {
            if (urlList[i].name.toLowerCase() === webSiteName.value.toLowerCase()) {
                Swal.fire({
                    icon: "error",
                    html: `
                            <p>The site name <span class="text-danger">
                            ${webSiteName.value}</span> already exists in the list.</p>
                            <p>Please use a different name.</p>
                        `,
                    confirmButtonText: "OK",
                });
                return;
            }
            if (urlList[i].link.toLowerCase() === webSiteUrl.value.toLowerCase()) {
                Swal.fire({
                    icon: "error",
                    html: `
                            <p>The site url <span class="text-danger">
                            ${webSiteUrl.value}</span> already exists in the list.</p>
                            <p>Please use a different Url.</p>
                        `,
                    confirmButtonText: "OK",
                });
                return;
            }
        }

        var url = {
            name: webSiteName.value,
            link: webSiteUrl.value,
        };

        urlList.push(url);
        saveLocalStorage();
        display();
        clear();
    } else {
        Swal.fire({
            icon: "error",
            html: `<h3 class="fs-3 text-black">Site Name or URL is not valid</h3>
                    <ul class="text-start ">
                        <li class="list-unstyled"><i class=" text-danger fa-solid fa-circle-arrow-right me-2"></i> Site name must contain at least 3 characters.</li>
                        <li class="list-unstyled"><i class=" text-danger fa-solid fa-circle-arrow-right me-2"></i> Site URL must be a valid one</li>
                    </ul>
                `,
            confirmButtonText: "Got it!",
        });
    }
}

function display() {
    var cartona = "";
    for (var i = 0; i < urlList.length; i++) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${urlList[i].name}</td>              
            <td>
                <a href="${urlList[i].link}" target="_blank" class="btn btn-visit pe-2">
                    <i class="fa-solid fa-eye text-white"></i>
                    Visit
                </a>
            </td>
            <td>
            <button onclick="deleteUrl(${i})" class="btn btn-delete pe-2">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
            </td>
        </tr>`;
    }
    tableBody.innerHTML = cartona;
}

function clear() {
    webSiteName.value = "";
    webSiteUrl.value = "";
    webSiteName.classList.remove("is-valid", "is-invalid");
    webSiteUrl.classList.remove("is-valid", "is-invalid");
}

function deleteUrl(index) {
    urlList.splice(index, 1);
    saveLocalStorage();
    display();
}

function saveLocalStorage() {
    localStorage.setItem("urlList", JSON.stringify(urlList));
}
