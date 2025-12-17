# Installing Maven on Windows

## Method 1: Using Chocolatey (Easiest)

If you have Chocolatey installed:
```powershell
choco install maven
```

## Method 2: Manual Installation

1. **Download Maven**:
   - Go to https://maven.apache.org/download.cgi
   - Download the latest `apache-maven-3.x.x-bin.zip` file

2. **Extract**:
   - Extract to `C:\Program Files\Apache\maven` (or your preferred location)

3. **Set Environment Variables**:
   - Open System Properties → Environment Variables
   - Add `MAVEN_HOME` = `C:\Program Files\Apache\maven`
   - Add to `Path`: `%MAVEN_HOME%\bin`

4. **Verify Installation**:
   ```powershell
   mvn -version
   ```

## Method 3: Using Maven Wrapper (No Installation Needed)

The project can use Maven Wrapper which doesn't require Maven to be installed globally.

