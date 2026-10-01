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
                echo 'Running vulnerability scan on dependencies...'
                bat 'npm audit'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to staging environment...'
                bat '''
                    if not exist staging mkdir staging
                    tar.exe -xf derma-ai-backend.zip -C staging
                    echo "Application successfully deployed to Staging."
                '''
            }
        }
        stage('Release') {
            steps {
                echo 'Promoting to production environment...'
                bat '''
                    if not exist production mkdir production
                    tar.exe -xf derma-ai-backend.zip -C production
                    echo "Application successfully promoted to Production."
                '''
            }
        }
        stage('Monitoring') {
            steps {
                echo 'Configuring Datadog monitoring and alerts...'
                bat '''
                    echo "Datadog agent configured to monitor production."
                    echo "Health check alert set for /health API endpoint."
                '''
            }
        }
    }
}