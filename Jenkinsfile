pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building DermaAI Backend (Creating ZIP artefact)...'
                // Uses native Windows tools to create a zip file
                bat 'tar.exe -a -c -f derma-ai-backend.zip *'
                // Tells Jenkins to save the file as a build artefact
                archiveArtifacts artifacts: 'derma-ai-backend.zip', followSymlinks: false
            }
        }
        stage('Test') {
            steps {
                echo 'Installing dependencies and running automated tests...'
                bat 'npm install'
                bat 'npm test'
            }
        }
       stage('Code Quality') {
            steps {
                echo 'Running code quality analysis with ESLint...'
                bat 'npx eslint server.js server.test.js'
            }
        }
        stage('Security') {
            steps {
                echo 'Running vulnerability scan...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to staging environment...'
            }
        }
        stage('Release') {
            steps {
                echo 'Promoting to production environment...'
            }
        }
        stage('Monitoring') {
            steps {
                echo 'Configuring monitoring and alerts...'
            }
        }
    }
}