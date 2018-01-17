#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'maven:3-alpine'
            args '-u root'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'mvn -B -DskipTests clean package'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'mvn test'
            }
			post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
    }
}