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
    }
}
