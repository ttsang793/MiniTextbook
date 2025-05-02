using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IImageService
{
    bool DeleteImage(string id, string service);
    Task<bool> UploadImage(IFormFile image, string id, string service);
}
