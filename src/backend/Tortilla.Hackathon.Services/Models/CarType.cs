
using System.Runtime.Serialization;

namespace Tortilla.Hackathon.Services.Models
{
    public enum CarType
    {
        [EnumMember(Value = "Diesel")]
        Diesel = 0,
        [EnumMember(Value = "Gasoline")]
        Gasoline = 1,
        [EnumMember(Value = "Hybrid")]
        Hybrid = 2,
        [EnumMember(Value = "Electric")]
        Electric = 3,
    }
}
