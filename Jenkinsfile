pipeline {
    agent { label 'aws_ec2' }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        BITBUCKET_CREDENTIAL_ID = 'bitbucket'
        BITBUCKET_REPO_URL = 'https://eranthaw@bitbucket.org/eranthaw/mock-rest-api.git'
    }

    stages {
        stage('gitclone') {
            steps {
                git branch: 'main', credentialsId: BITBUCKET_CREDENTIAL_ID, url: BITBUCKET_REPO_URL
            }
        }
        stage('SonarQube Analysis') {
            def scannerHome = tool 'SonarScanner'
            withSonarQubeEnv() {
                sh "${scannerHome}/bin/sonar-scanner"
            }
        }
        stage('docker build') {
            steps {
                sh 'sudo docker build -t eranthawelikala/mock-rest-api:latest .'
            }
        }

        stage('dockerhub login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('docker push') {
            steps {
                sh 'sudo docker push eranthawelikala/mock-rest-api:latest'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
        success {
            echo 'Succeeded!'
            sendSuccessEmail()
        }
    }
}

void sendSuccessEmail() {
    emailext to: 'eranthawelikala@gmail.com',
      subject: "Status: ${currentBuild.result} - Job \'${env.JOB_BASE_NAME}:${env.BUILD_NUMBER}\'",
      body: """<p>Job <b>\'${env.JOB_BASE_NAME}:${env.BUILD_NUMBER} Status: ${currentBuild.result}\'
      </b></p><p>Environment updated with docker image version : ${env.VERSION_NO}</p>""",
      replyTo: 'do-not-reply@company.com'
}
