using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace SneakerResaleStore.API.Jwt
{
    public class JwtManager
    {
        private readonly SneakerResaleStoreContext _context;
        private readonly string _issuer;
        private readonly string _secretKey;
        private readonly int _seconds;
        private readonly string _audience;
        private readonly ITokenStorage _storage;

        public JwtManager(
            SneakerResaleStoreContext context,
            string issuer,
            string secretKey,
            int seconds,
            string audience,
            ITokenStorage storage)
        {
            _context = context;
            _issuer = issuer;
            _seconds = seconds;
            _storage = storage;
            _audience = audience;
            _secretKey = secretKey;
            
        }

        public string MakeToken(string email, string password)
        {
            try
            {
                var user = _context.Users
                    .Include(u => u.Role)
                    .ThenInclude(u => u.RoleUseCases)
                    .FirstOrDefault(u => u.Email == email && u.IsActive);

                if (user == null || user.Role == null || !user.Role.IsActive)
                {
     
                    return null;
                }

                int salt = 010;
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(password, salt);

                bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(user.Password, passwordHash);

                if (!isPasswordCorrect)
                {

                    return null;
                }

                int id = user.Id;

                List<int> useCases = user.Role.RoleUseCases.Select(u => u.UseCaseId).ToList();

                var tokenId = Guid.NewGuid().ToString();

                _storage.AddToken(tokenId);

                var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Jti, tokenId, ClaimValueTypes.String, _issuer),
            new Claim(JwtRegisteredClaimNames.Iss, _issuer, ClaimValueTypes.String, _issuer),
            new Claim(JwtRegisteredClaimNames.Aud, _audience, ClaimValueTypes.String, _issuer),
            new Claim(JwtRegisteredClaimNames.Iat,DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64, _issuer),
            new Claim("Id", id.ToString()),
            new Claim("Email", user.Email),
            new Claim("Role", user.Role.Id.ToString()),
            new Claim("UseCases", JsonConvert.SerializeObject(useCases))
        };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));

                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var now = DateTime.UtcNow;
                var token = new JwtSecurityToken(
                    issuer: _issuer,
                    audience: _audience,
                    claims: claims,
                    notBefore: now,
                    expires: now.AddSeconds(_seconds),
                    signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
     
                Console.WriteLine($"An error occurred in MakeToken: {ex.Message}");

                return null;
            }
        }

    }
}
