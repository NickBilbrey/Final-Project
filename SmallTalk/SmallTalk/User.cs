﻿using System;
using System.Collections.Generic;

namespace SmallTalk;

public partial class User
{
    public int UserId { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Dictionary> Dictionaries { get; set; } = new List<Dictionary>();
}
