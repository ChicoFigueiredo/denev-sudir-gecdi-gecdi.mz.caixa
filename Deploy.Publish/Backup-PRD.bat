SET T=%time: =0%
SET D=%date:,=0%
SET L=%D:~6,4%-%D:~3,2%-%D:~0,2%_%T:~0,2%.%T:~3,2%.%T:~6,2%
echo %L%

"C:\Program Files\7-Zip\7z.exe" a -r -y -mx9 -t7z -bt backup\backup_site_gecdi.mz.caixa_%L%.7z \\servicos-gerenciador.mz.caixa\1048conheca-gerenciador.caixa\*.*

PAUSE