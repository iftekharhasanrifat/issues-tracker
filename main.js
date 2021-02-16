document.getElementById('issueInputForm').addEventListener('submit', submitIssue);


function submitIssue(e) {
    const errorMessage = document.getElementById('error-message');
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    if (description === '' || assignedTo === '') {
        displayError("Please enter description and Assign to properly.");
    } else {
        const id = Math.floor(Math.random() * 100000000) + '';
        const status = 'Open';

        const issue = { id, description, severity, assignedTo, status };
        let issues = [];
        if (localStorage.getItem('issues')) {
            issues = JSON.parse(localStorage.getItem('issues'));
        }
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));

        document.getElementById('issueInputForm').reset();
        fetchIssues();
        e.preventDefault();
        errorMessage.innerText = "";
    }

}

const closeIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues);
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue => issue.id != id);
    console.log(remainingIssues);
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    fetchIssues();
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
    const remainingIssues = issues.filter(issue => issue.status != 'Closed');
    document.getElementById('openIssue').innerText = remainingIssues.length;
    document.getElementById('totalIssue').innerText = issues.length;

    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];

        if (status == 'Closed') {
            issuesList.innerHTML += `<div class="well">
                <h6>Issue ID: ${id} </h6>
                <p><span class="label label-danger"> ${status} </span></p>
                <strike><h3>${description}</h3></strike>
                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                </div>`;
        } else {
            issuesList.innerHTML += `<div class="well">
                <h6>Issue ID: ${id} </h6>
                <p><span class="label label-info"> ${status} </span></p>
                <h3> ${description} </h3>
                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                </div>`;
        }
    }
}
const displayError = error => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}