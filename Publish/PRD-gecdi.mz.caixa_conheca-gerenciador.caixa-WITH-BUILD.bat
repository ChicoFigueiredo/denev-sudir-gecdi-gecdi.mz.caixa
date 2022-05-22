cd ..\FrontEnd
REM npm run build:prod
call ng build --configuration production --build-optimizer --optimization --progress --verbose --aot

cd ..\PushAPI
call dotnet build /p:DeployOnBuild=true /p:PublishProfile=Properties\PublishProfiles\Produção.pubxml

cd ..\Publish

robocopy \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\log\ .\PRD-gecdi.mz.caixa\log\ /s /eta /z /xd log /w:2 /r:100 /mt:8 /PURGE
robocopy \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\log\ .\PRD-gecdi.mz.caixa\log\ /s /eta /z /xd log /w:2 /r:100 /mt:8 /PURGE

robocopy .\PRD-gecdi.mz.caixa\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 /PURGE
robocopy .\PRD-Pastas_Extras\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 

robocopy .\PRD-gecdi.mz.caixa\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 /PURGE
robocopy .\PRD-Pastas_Extras\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 

PAUSE