cd ..\FrontEnd
call ng build --configuration production --build-optimizer --optimization --progress --verbose --aot
rem call ng build --configuration production --aot
rem call npm run build:prod

cd ..\PushAPI

call dotnet build /p:DeployOnBuild=true /p:PublishProfile="%CD%/Properties/PublishProfiles/Producao.pubxml"

cd ..\Publish

robocopy \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\log\ .\PRD-gecdi.mz.caixa\log\ /s /eta /z /xd log /w:2 /r:100 /mt:8 /PURGE
robocopy \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\log\ .\PRD-gecdi.mz.caixa\log\ /s /eta /z /xd log /w:2 /r:100 /mt:8 /PURGE

echo " " >> \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\web.config
robocopy .\PRD-gecdi.mz.caixa\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 /PURGE
robocopy .\PRD-Pastas_Extras\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 

echo " " >> \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\web.config
robocopy .\PRD-gecdi.mz.caixa\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 /PURGE
robocopy .\PRD-Pastas_Extras\ \\gecdi.mz.caixa\1048conheca-gerenciador.caixa\ /s /eta /z /w:2 /r:100 /mt:8 

PAUSE