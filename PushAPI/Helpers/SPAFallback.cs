//using Microsoft.Extensions.Options;
//using Microsoft.IdentityModel.Tokens;
//using PushAPI.Services;
//using System.IdentityModel.Tokens.Jwt;
//using System.Text;

//namespace PushAPI.Helpers
//{
//    public class SPAFallback
//    {
//        private readonly RequestDelegate _next;
//        private readonly AppSettings _appSettings;

//        public SPAFallback(RequestDelegate next, IOptions<AppSettings> appSettings)
//        {
//            _next = next;
//            _appSettings = appSettings.Value;
//        }

//        public async Task Invoke(HttpContext context, IUserService userService)
//        {

//            // 404 - no match
//            if (string.IsNullOrEmpty(ServerConfig.FolderNotFoundFallbackPath))
//            {
//                await Status404Page(context);
//                return;
//            }

//            // 404  - SPA fall through middleware - for SPA apps should fallback to index.html
//            var path = context.Request.Path;
//            if (string.IsNullOrEmpty(Path.GetExtension(path)))
//            {
//                var file = Path.Combine(ServerConfig.WebRoot,
//                    ServerConfig.FolderNotFoundFallbackPath.Trim('/', '\\'));
//                var fi = new FileInfo(file);
//                if (fi.Exists)
//                {
//                    if (!context.Response.HasStarted)
//                    {
//                        context.Response.ContentType = "text/html";
//                        context.Response.StatusCode = 200;
//                    }

//                    await context.Response.SendFileAsync(new PhysicalFileInfo(fi));
//                    await context.Response.CompleteAsync();
//                }
//                else
//                {
//                    await Status404Page(context, isFallback: true);
//                }
//            }
//        }

//}
