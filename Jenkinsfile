node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv('SonarQube Scanner for Jenkins Version2.14') {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}