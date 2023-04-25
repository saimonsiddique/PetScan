function createMailOptions(sender, receiver, subject, html) {
  return {
    from: sender,
    to: receiver,
    subject: subject,
    html: html,
  };
}

module.exports = createMailOptions;
