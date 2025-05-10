using Application.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IVnPayService
{
    string CreatePaymentUrl(OrderDTO order, HttpContext context);

    VnPayPaymentResponseModel PaymentExecute(IQueryCollection collections);
}