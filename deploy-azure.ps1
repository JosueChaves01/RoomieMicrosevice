# Azure Container Apps Deployment Script
# Prerequisites: Azure CLI installed and logged in (az login)

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroup,
    
    [Parameter(Mandatory=$true)]
    [string]$ContainerAppName,
    
    [Parameter(Mandatory=$true)]
    [string]$AcrName,
    
    [Parameter(Mandatory=$true)]
    [string]$EnvironmentName,
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastus",
    
    [Parameter(Mandatory=$false)]
    [string]$ImageTag = "latest"
)

Write-Host "🚀 Starting Azure Container Apps Deployment..." -ForegroundColor Cyan

# Variables
$ImageName = "roomies-microservice"
$FullImageName = "$AcrName.azurecr.io/$ImageName:$ImageTag"

# Step 1: Build Docker image
Write-Host "`n📦 Building Docker image..." -ForegroundColor Yellow
docker build -t $ImageName`:$ImageTag .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed" -ForegroundColor Red
    exit 1
}

# Step 2: Login to Azure Container Registry
Write-Host "`n🔐 Logging into Azure Container Registry..." -ForegroundColor Yellow
az acr login --name $AcrName
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ACR login failed" -ForegroundColor Red
    exit 1
}

# Step 3: Tag image
Write-Host "`n🏷️  Tagging image..." -ForegroundColor Yellow
docker tag $ImageName`:$ImageTag $FullImageName

# Step 4: Push image to ACR
Write-Host "`n⬆️  Pushing image to Azure Container Registry..." -ForegroundColor Yellow
docker push $FullImageName
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker push failed" -ForegroundColor Red
    exit 1
}

# Step 5: Check if Container App exists
Write-Host "`n🔍 Checking if Container App exists..." -ForegroundColor Yellow
$appExists = az containerapp show --name $ContainerAppName --resource-group $ResourceGroup 2>$null
if ($appExists) {
    # Update existing Container App
    Write-Host "`n🔄 Updating existing Container App..." -ForegroundColor Yellow
    az containerapp update `
        --name $ContainerAppName `
        --resource-group $ResourceGroup `
        --image $FullImageName
} else {
    # Create new Container App
    Write-Host "`n✨ Creating new Container App..." -ForegroundColor Yellow
    az containerapp create `
        --name $ContainerAppName `
        --resource-group $ResourceGroup `
        --environment $EnvironmentName `
        --image $FullImageName `
        --target-port 3000 `
        --ingress external `
        --cpu 0.5 `
        --memory 1.0Gi `
        --min-replicas 1 `
        --max-replicas 10
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Container App deployment failed" -ForegroundColor Red
    exit 1
}

# Step 6: Get the application URL
Write-Host "`n🌐 Getting application URL..." -ForegroundColor Yellow
$appUrl = az containerapp show `
    --name $ContainerAppName `
    --resource-group $ResourceGroup `
    --query properties.configuration.ingress.fqdn `
    --output tsv

Write-Host "`n✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "🔗 Application URL: https://$appUrl" -ForegroundColor Cyan
Write-Host "`n💡 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Configure secrets using: az containerapp secret set" -ForegroundColor White
Write-Host "   2. Set environment variables in Azure Portal" -ForegroundColor White
Write-Host "   3. Configure Cosmos DB connection string" -ForegroundColor White
Write-Host "   4. Test the application: https://$appUrl/health" -ForegroundColor White
