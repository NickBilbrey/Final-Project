using System;
using System.Collections.Generic;

namespace SmallTalk;

public partial class UserDictionary
{
    public int EntryId { get; set; }

    public string? UserEntry { get; set; }

    public string? Translation { get; set; }

    public int? DictionaryId { get; set; }

    public virtual Dictionary? Dictionary { get; set; }
}
