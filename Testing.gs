function test() {
  logger = new create("sample");
  
  logger.add("the first line");
  logger.add("the second line");
  logger.send();
  logger.save("sample");
}