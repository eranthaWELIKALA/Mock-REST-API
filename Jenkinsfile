pipeline {
    agent { label 'aws_ec2' }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('00a7feb1-0f7b-40c6-be79-267f4b30985a')
        BITBUCKET_CREDENTIAL_ID = '61822e92-06e7-495a-9fb2-7b9455374316'
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
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u $DOCKERHUB_CREDENTIALS_UDR --password-stdin'
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
