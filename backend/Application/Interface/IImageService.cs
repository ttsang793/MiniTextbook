using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IImageService
{
    bool DeleteImage(int id, string service);
    Task<bool> UploadImage(IFormFile image, int id, string service);
}
