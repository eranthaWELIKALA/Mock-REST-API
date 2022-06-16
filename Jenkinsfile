node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarQube Scanner for Jenkins Version2.14';
    withSonarQubeEnv('SonarScanner') {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}