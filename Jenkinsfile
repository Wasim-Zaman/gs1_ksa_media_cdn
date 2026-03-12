pipeline {
    agent any

    environment {
        ENV_FILE_PATH = "C:\tools\Jenkins\Envs\gs1-ksa-media-cdn"
    }

    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '3', daysToKeepStr: '', numToKeepStr: '3')
    }


    stages {
        stage('Checkout') {
            steps {
                echo "📦 Cloning GS1 KSA Media CDN repository..."
                checkout scmGit(
                    branches: [[name: '*/main']], 
                    extensions: [], 
                    userRemoteConfigs: [[
                        credentialsId: 'Wasim-Jenkins-Credentials', 
                        url: 'https://github.com/GS1-Saudi-Arabia/gs1_ksa_media_cdn.git'
                    ]]
                )
            }
        }

        stage('Setup Environment File') {
            steps {
                echo "📁 Copying .env file to the backend root..."
                bat "copy \"${ENV_FILE_PATH}\" \"%WORKSPACE%\\.env\""
            }
        }

        stage('Stop PM2 Process (if running)') {
            steps {
                script {
                    echo "🛑 Stopping PM2 process if running..."
                    def processStatus = bat(script: 'pm2 list', returnStdout: true).trim()
                    
                    if (processStatus.contains('gs1-media-cdn')) {
                        bat 'pm2 stop gs1-media-cdn || exit 0'
                        echo "PM2 process 'gs1-media-cdn' stopped."
                    } else {
                        echo "PM2 process 'gs1-media-cdn' not running."
                    }
                }
            }
        }

        stage('Install & Build Backend') {
            steps {
                echo "📦 Installing dependencies..."
                bat 'npm install'

                echo "🔨 Building the backend..."
                bat 'npm run build'
            }
        }

        stage('Manage PM2 Process') {
            steps {
                script {
                    echo "🔁 Ensuring PM2 process for GS1 KSA Media CDN is running..."

                    def processStatus = bat(script: 'pm2 list', returnStdout: true).trim()
                    
                    // Node API Process
                    if (processStatus.contains('gs1-media-cdn')) {
                        echo "PM2 process 'gs1-media-cdn' found. Restarting..."
                        bat 'pm2 restart gs1-media-cdn || exit 0'
                    } else {
                        echo "PM2 process 'gs1-media-cdn' not found. Starting..."
                        bat 'pm2 start dist/index.js --name gs1-media-cdn'
                    }


                    echo "💾 Saving PM2 configuration..."
                    bat 'pm2 save'
                }
            }
        }
    }
}
