using System.Runtime.Serialization;

namespace Tortilla.Hackathon.Services.Models
{
    public enum Recurrency
    {
        [EnumMember(Value = "SingleDay")]
        SingleDay = 0,
        [EnumMember(Value = "WorkingDays")]
        WorkingDays = 1,
        [EnumMember(Value = "WholeWeek")]
        WholeWeek = 2
    }
}
