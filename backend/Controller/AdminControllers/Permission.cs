using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Controller.AdminControllers;

[ApiController]
class Permission : ControllerBase
{
    public const byte READ_BOOK = 1;
    public const byte ADD_BOOK = 2;
    public const byte UPDATE_BOOK = 3;
    public const byte STATUS_BOOK = 4;

    public const byte READ_SERIES = 5;
    public const byte ADD_SERIES = 6;
    public const byte UPDATE_SERIES = 7;
    public const byte STATUS_SERIES = 8;

    public const byte READ_PUBLISHER = 9;
    public const byte ADD_PUBLISHER = 10;
    public const byte UPDATE_PUBLISHER = 11;
    public const byte STATUS_PUBLISHER = 12;

    public const byte READ_SUBJECT = 13;
    public const byte ADD_SUBJECT = 14;
    public const byte UPDATE_SUBJECT = 15;
    public const byte STATUS_SUBJECT = 16;

    public const byte READ_ORDER = 17;
    public const byte UPDATE_ORDER = 18;

    public const byte READ_USER = 19;
    public const byte LOCK_USER = 20;
    public const byte UNLOCK_USER = 21;

    public const byte READ_ADMIN = 22;
    public const byte ADD_ADMIN = 23;
    public const byte UPDATE_ADMIN = 24;
    public const byte RESET_PASS_ADMIN = 25;
    public const byte LOCK_ADMIN = 26;
    public const byte UNLOCK_ADMIN = 27;

    public const byte READ_ROLE = 28;
    public const byte ADD_ROLE = 29;
    public const byte UPDATE_ROLE = 30;
    public const byte DELETE_ROLE = 31;
    public const byte UPDATE_ROLE_PERMISSION = 32;

    public static bool Check(byte permission, HttpContext httpContext)
    {
        var sessionData = httpContext.Session.GetString("apermission");
        if (string.IsNullOrEmpty(sessionData)) return false;

        var list = JsonConvert.DeserializeObject<List<byte>>(sessionData);
        return list?.Contains(permission) ?? false;
    }
}