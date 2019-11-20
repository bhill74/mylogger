/**
 * Collects all the messages output to the log, just in case
 * they need to be saved or sent to the user.
 *
 * @param {string} title of the log that is being collected
 * @return {string} the object used to log information to
 */
function create(title) {
  this.log = "";
  this.title = title;
  
  // Add more content to the log.
  this.add = function(msg) {
    Logger.log(msg);
    this.log += msg + "\n";
  }
  
  // Send the log to the current user.
  this.send = function() {
    MailApp.sendEmail({
      to: Session.getActiveUser().getEmail(), 
      subject: this.title, 
      htmlBody: "<pre>" + this.log + "</pre>"
    });
  }
  
  // Save the log to the given directory in the user's GDrive
  this.save = function(dir) {
    var dirs = DriveApp.getFoldersByName(dir);
    var directory;
    if (dirs.hasNext()) {
      directory = dirs.next();
    } else {
      directory = DriveApp.createFolder(dir);
    }
    
    var filename = this.title + ".log";
    var files = directory.getFilesByName(filename);
    while (files.hasNext()) {
      DriveApp.removeFile(files.next());
    }
    directory.createFile(filename, this.log);
  }
};