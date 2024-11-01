using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.Unicode;

namespace API.Controllers
{
    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")] //account/register
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO pRegisterDTO)
        {
            if (await UserExists(pRegisterDTO.UserName))
            {
                return BadRequest("User Already Exists");
            }

            return Ok();
            //using var hmac = new HMACSHA512();

            //var user = new AppUser
            //{
            //    UserName = pRegisterDTO.UserName,
            //    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pRegisterDTO.Password)),
            //    PasswordSalt = hmac.Key
            //};

            //context.Users.Add(user);
            //await context.SaveChangesAsync();

            //return new UserDTO
            //{
            //    Username = user.UserName,
            //    Token = tokenService.CreateToken(user)
            //};
        }

        [HttpPost("login")] //account/login
        public async Task<ActionResult<UserDTO>> Login(LoginDTO pLogin)
        {
            AppUser user = await context.Users.FirstOrDefaultAsync(m => m.UserName == pLogin.UserName);

            if (user == null)
            {
                return Unauthorized("Invalid User");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pLogin.Password));

            for(int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDTO
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string pUserName)
        {
            return await context.Users.AnyAsync(m => m.UserName.ToLower() == pUserName.ToLower());
        }
    }
}
