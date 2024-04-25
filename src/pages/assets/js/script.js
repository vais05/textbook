function confirmSubmission() {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("Are you sure you want to submit?");
    if (confirmed) {
        alert("Form submitted.");
    }
}