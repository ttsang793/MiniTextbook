using Application.Interface;
using Microsoft.AspNetCore.Http;

namespace Application.Service;

public class ImageService : IImageService
{
    public bool DeleteImage(int id, string service)
    {
        try
        {
            string deleteDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\reactapp\\src\\images\\" + service);
            string[] files = Directory.GetFiles(deleteDirectory, service + "_" + id + ".*");

            Console.WriteLine(files.Length);

            if (files.Length > 0)
            {
                foreach (string file in files) File.Delete(file);
                return true;
            }
            else return false;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> UploadImage(IFormFile image, int id, string service)
    {
        try
        {
            string uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\reactapp\\src\\images\\" + service);
            string fileName = service + "_" + id + Path.GetExtension(image.FileName);
            string filePath = Path.Combine(uploadDirectory, fileName);

            DeleteImage(id, service);

            using var stream = new FileStream(filePath, FileMode.Create);
            await image.CopyToAsync(stream);

            return true;
        }
        catch
        {
            return false;
        }
    }
}
