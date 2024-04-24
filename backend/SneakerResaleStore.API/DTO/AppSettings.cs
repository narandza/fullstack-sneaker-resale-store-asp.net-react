namespace SneakerResaleStore.API.DTO
{
    public class AppSettings
    {
        public JwtSettings Jwt { get; set; }
    }

    public class JwtSettings
    {
        public string SecretKey { get; set; }
        public int DurationSeconds { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
