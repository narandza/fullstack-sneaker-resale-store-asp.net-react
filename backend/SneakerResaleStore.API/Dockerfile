#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["SneakerResaleStore.API/SneakerResaleStore.API.csproj", "SneakerResaleStore.API/"]
COPY ["SneakerResaleStore.Domain/SneakerResaleStore.Domain.csproj", "SneakerResaleStore.Domain/"]
COPY ["SneakerResaleStore.Implementation/SneakerResaleStore.Implementation.csproj", "SneakerResaleStore.Implementation/"]
COPY ["SneakerResaleStore.DataAccess/SneakerResaleStore.DataAccess.csproj", "SneakerResaleStore.DataAccess/"]
COPY ["SneakerResaleStore.Application/SneakerResaleStore.Application.csproj", "SneakerResaleStore.Application/"]
RUN dotnet restore "SneakerResaleStore.API/SneakerResaleStore.API.csproj"
COPY . .
WORKDIR "/src/SneakerResaleStore.API"
RUN dotnet build "SneakerResaleStore.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SneakerResaleStore.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SneakerResaleStore.API.dll"]