/**
 * Custom Terminal Commands
 * -----------------------------
 * In this file, define custom commands for your terminal application.
 * This will overwrite any built-in system commands if they exist.
 */
var customCommands = {};

/**
 * Base64 encodes a string.
*/
builtInCommands.base64enc = {
    about: "base64enc [string]<br>&nbsp;&nbsp;Base64 encode a string.",
    exe: function (args) {
        if(args.length == 1){
            return "No string specified.";
        }
        args.shift();
        return btoa(args.join(" "));
    }
}

/**
 * Base64 decodes a string.
*/
builtInCommands.base64dec = {
    about: "base64dec [string]<br>&nbsp;&nbsp;Base64 decode a string.",
    exe: function (args) {
        if(args.length == 1){
            return "No string specified.";
        }
        args.shift();
        return atob(args.join(" "));
    }
}

/**
 * Print a simple message.
 **/
customCommands.cow = {
    about:  "cow<br>&nbsp;&nbsp;What does a cow say?",     // Help text for this command.
    exe:  function() {                                     // Executed for this command.
            return "Moooooo!";
    }
};
function MD5(sMessage)
{
 function RotateLeft(lValue, iShiftBits)
  {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }
 function AddUnsigned(lX,lY)
  {
  var lX4,lY4,lX8,lY8,lResult;
  lX8 = (lX & 0x80000000);
  lY8 = (lY & 0x80000000);
  lX4 = (lX & 0x40000000);
  lY4 = (lY & 0x40000000);
  lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
  if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
  if (lX4 | lY4)
     {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
     }
    else return (lResult ^ lX8 ^ lY8);
 }
 function F(x,y,z) { return (x & y) | ((~x) & z); }
 function G(x,y,z) { return (x & z) | (y & (~z)); }
 function H(x,y,z) { return (x ^ y ^ z); }
 function I(x,y,z) { return (y ^ (x | (~z))); }
 function FF(a,b,c,d,x,s,ac)
 {
   a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
   return AddUnsigned(RotateLeft(a, s), b);
 }
 function GG(a,b,c,d,x,s,ac)
 {
   a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
   return AddUnsigned(RotateLeft(a, s), b);
 }
 function HH(a,b,c,d,x,s,ac)
 {
   a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
   return AddUnsigned(RotateLeft(a, s), b);
 }
 function II(a,b,c,d,x,s,ac)
 {
   a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
   return AddUnsigned(RotateLeft(a, s), b);
 }
 function ConvertToWordArray(sMessage)
 {
   var lWordCount;
   var lMessageLength = sMessage.length;
   var lNumberOfWords_temp1=lMessageLength + 8;
   var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
   var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
   var lWordArray=Array(lNumberOfWords-1);
   var lBytePosition = 0;
   var lByteCount = 0;
   while ( lByteCount < lMessageLength )
   {
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount)<<lBytePosition));
    lByteCount++;
   }
   lWordCount = (lByteCount-(lByteCount % 4))/4;
   lBytePosition = (lByteCount % 4)*8;
   lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
   lWordArray[lNumberOfWords-2] = lMessageLength<<3;
   lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
   return lWordArray;
 }
 function WordToHex(lValue)
 {
   var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
   for (lCount = 0;lCount<=3;lCount++)
   {
     lByte = (lValue>>>(lCount*8)) & 255;
     WordToHexValue_temp = "0" + lByte.toString(16);
     WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
   }
   return WordToHexValue;
 }
 var x=Array();
 var k,AA,BB,CC,DD,a,b,c,d
 var S11=7, S12=12, S13=17, S14=22;
 var S21=5, S22=9 , S23=14, S24=20;
 var S31=4, S32=11, S33=16, S34=23;
 var S41=6, S42=10, S43=15, S44=21;
 x = ConvertToWordArray(sMessage);
 a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 for (k=0;k<x.length;k+=16)
 {
     AA=a; BB=b; CC=c; DD=d;
     a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
     d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
     c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
     b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
     a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
     d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
     c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
     b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
     a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
     d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
     c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
     b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
     a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
     d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
     c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
     b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
 
     a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
     d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
     c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
     b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
     a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
     d=GG(d,a,b,c,x[k+10],S22,0x2441453);
     c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
     b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
     a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
     d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
     c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
     b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
     a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
     d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
     c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
     b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
 
     a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
     d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
     c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
     b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
     a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
     d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
     c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
     b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
     a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
     d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
     c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
     b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
     a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
     d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
     c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
     b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
 
     a=II(a,b,c,d,x[k+0], S41,0xF4292244);
     d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
     c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
     b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
     a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
     d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
     c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
     b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
     a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
     d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
     c=II(c,d,a,b,x[k+6], S43,0xA3014314);
     b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
     a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
     d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
     c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
     b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
 
     a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
 }
    var temp= WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
}

function ok(){
    var search = this.location.search;
    if (search.indexOf('id=')!=-1)
    {
        var id = (search.substring(4));
        return "got password:"+MD5(id+"apatch")
    }else{
        return "not id found"
    }
    
}
customCommands.fastboot = {
    about:  "usage: fastboot [OPTION...]boot/flash COMMAND...",     // Help text for this command.
    exe:  function(args) {                                     // Executed for this command.
            if (args.length>2 && args.length<5){
                if (kptools==2 && args[1]=="boot" && args[2]=="new-boot.img")
                return ok()
                if (kptools==2 && args[1]=="flash" &&args[2]=="boot" && args[3]=="new-boot.img")
                return ok()

                if (args[1]=="boot"){
                    return "can not boot"+args[2]
                }
                if (args[2]=="boot"){
                    return "can not boot"+args[3]
                }
            }
            return "unkown command"
    }
};


var patched=0
var kptools=0


var magisk=`Parsing image: [boot.img]<br>
HEADER_VER      [3]<br>
KERNEL_SZ       [50643632]<br>
RAMDISK_SZ      [19621228]<br>
OS_VERSION      [11.0.0]<br>
OS_PATCH_LEVEL  [2021-10]<br>
PAGESIZE        [4096]<br>
CMDLINE         []<br>
KERNEL_FMT      [raw]<br>
RAMDISK_FMT     [gzip]<br>
VBMETA<br>`
customCommands.magiskboot = {
    about:  "magiskboot unpack/repack boot.img",     // Help text for this command.
    exe:  function(args) { 
        if (args.length!=3){
            return "useage:magiskboot unpack/repack boot.img"
        }
        if (args[1]=="unpack" &&  args[2]=="boot.img"){
            term.makeFile("kernel-b")
            patched=1
            return magisk+"mv kernel kernel-b(this command is auto run by fake terminal)<br>"
            
            
        }
        if (args[1]=="repack" &&  args[2]=="boot.img"){
            if(kptools==1){
                term.makeFile("new-boot.img")
                kptools=2
                return magisk+"Repack to image: [new-boot.img]<br>"
                
            }
        }

        return "error"
    }
}


var help=`Kernel Image Patch Tools. va00<br>

Usage: ./kptools COMMAND [Options...]<br>

COMMAND:<br>
  -h, --help                       Print this message.<br>
  -v, --version                    Print version number. Print kpimg version if -k specified.<br>
  -p, --patch                      Patch or Update patch of kernel image(-i) with specified kpimg(-k) and superkey(-s).<br>
  -u, --unpatch                    Unpatch patched kernel image(-i).<br>
  -r, --reset-skey                 Reset superkey of patched image(-i).<br>
  -d, --dump                       Dump kallsyms infomations of kernel image(-i).<br>
  -l, --list                       Print all patch informations of kernel image if (-i) specified.<br>
                                   Print extra item informations if (-M) specified.<br>
                                   Print KernelPatch image informations if (-k) specified.<br>
Options:
  -i, --image PATH                 Kernel image path.<br>
  -k, --kpimg PATH                 KernelPatch image path.<br>
  -s, --skey PATH                  Set superkey.<br>
  -o, --out PATH                   Patched image path.<br>
  -a  --addition KEY=VALUE         Add additional information.<br>
  -K, --kpatch PATH                Embed kpatch executable binary into patches.<br>
  -M, --embed-extra-path PATH      Embed new extra item.<br>
  -E, --embeded-extra-name NAME    Preserve and modifiy embedded extra item.<br>
  -T, --extra-type TYPE            Set type of previous extra item.<br>
  -N, --extra-name NAME            Set name of previous extra item.<br>
  -V, --extra-event EVENT          Set trigger event of previous extra item.<br>
  -A, --extra-args ARGS            Set arguments of previous extra item.<br>
  -D, --extra-detach               Detach previous extra item from patches.<br>`
customCommands.kptools = {
    about:  help,     // Help text for this command.
    exe:  function(args) {                                     // Executed for this command.
        var p=1;
        var ii=1;
        var k=1;
        var kp=1;
        var kpimg="";
        var img="";
        var skey="";
        if (args.length <3){
            return help
        }
        for(i=1;i<args.length;i++){
            console.log(args[i])
            if (args[i]=="-v" || args[i]=="--version"){
                return "a00"
            }
            if (args[i]=="-p" || args[i]=="--patch"){
                p=0;
            }
            if (args[i]=="-i" || args[i]=="--image"){
                i++
                img=args[i];
                ii=0;
            }
            if (args[i]=="-s" || args[i]=="--skey"){
                i++
                k=0;
                skey=args[i];
            }
            if (args[i]=="-k" || args[i]=="--kpimg"){
                i++
                kp=0;
                kpimg=args[i];
            }
            
            if (args[i]=="-d" || args[i]=="--dump"){
                return `0x02de67a0 d ecryptfs_fs_type
                0x02de67e8 d attributes
                0x02de67f8 d version_attr
                0x02de6818 d ecryptfs_cipher_code_str_map
                0x02de68a0 d ecryptfs_msg_ctx_free_list
                0x02de68b0 d ecryptfs_msg_ctx_alloc_list
                0x02de68c0 d ecryptfs_miscdev
                0x02de6910 d sdcardfs_permission_wrn._rs
                0x02de6938 d sdcardfs_setattr_wrn._rs
                0x02de6960 D sdcardfs_super_list_lock
                0x02de6980 D sdcardfs_super_list
                0x02de6990 d sdcardfs_fs_type
                0x02de69d8 d extensions_type
                0x02de6a00 D extension_group
                0x02de6a88 D sd_default_groups
                0x02de6a98 d extensions_group_ops
                0x02de6ac0 d extensions_name_type
                0x02de6ae8 d extensions_value_group_ops
                0x02de6b10 d extension_details_type
                0x02de6b38 d extension_details_item_ops
                0x02de6b50 d sdcardfs_packages
                0x02de6bf8 d packages_type
                0x02de6c20 d packages_group_ops
                0x02de6c48 d packages_attrs
                0x02de6c60 d package_appid_type
                0x02de6c88 d package_details_item_ops
                0x02de6ca0 d package_details_attrs
                0x02de6cc0 d package_details_attr_appid
                0x02de6ce8 d package_details_attr_excluded_userids
                0x02de6d10 d package_details_attr_clear_userid
                0x02de6d38 d packages_attr_packages_gid_list
                0x02de6d60 d packages_attr_remove_userid
                0x02de6d88 d tables
                0x02de6d90 d default_table
                0x02de6dd0 d table
                0x02de6e10 d table
                0x02de6e50 d fuse_miscdevice
                0x02de6ea0 D fuse_mutex
                0x02de6ec0 d fuse_fs_type
                0x02de6f08 d fuseblk_fs_type
                0x02de6f50 d fuse_ctl_fs_type
                0x02de6f98 D fuse_xattr_handlers
                0x02de6fa8 D fuse_acl_xattr_handlers
                0x02de6fc8 D fuse_no_acl_xattr_handlers
                0x02de6fe8 d ovl_redirect_always_follow
                0x02de6ff0 d ovl_fs_type
                0x02de7038 d ovl_xattr_handlers
                0x02de7060 d ovl_check_origin_fh._rs
                0x02de7088 d ovl_verify_set_fh._rs
                0x02de70b0 d ovl_index_upper._rs
                0x02de70d8 d ovl_verify_index._rs
                0x02de7100 d ovl_verify_index._rs.8
                0x02de7128 d ovl_lookup_index._rs
                0x02de7150 d ovl_lookup_index._rs.11
                0x02de7178 d ovl_lookup_index._rs.13
                0x02de71a0 d ovl_lookup_index._rs.15
                0x02de71c8 d ovl_lookup._rs
                0x02de71f0 d ovl_lookup._rs.18
                0x02de7218 d ovl_get_fh._rs
                0x02de7240 d ovl_get_fh._rs.26
                0x02de7268 d ovl_check_metacopy_xattr._rs
                0x02de7290 d ovl_getxattr._rs
                0x02de72b8 d ovl_get_redirect_xattr._rs
                0x02de72e0 d ovl_cleanup_index._rs
                0x02de7308 d ovl_get_nlink._rs
                0x02de7330 d ovl_get_inode._rs
                0x02de7358 d ovl_map_dev_ino._rs
                0x02de7380 d ovl_redirect_max
                0x02de7388 d ovl_instantiate._rs
                0x02de73b0 d ovl_set_redirect._rs
                0x02de73d8 d ovl_remap_lower_ino._rs
                0x02de7400 d ovl_cache_update_ino._rs
                0x02de7428 d ovl_d_to_fh._rs
                0x02de7450 d ovl_encode_maybe_copy_up._rs
                0x02de7478 d ovl_fh_to_dentry._rs
                0x02de74a0 d ovl_lookup_real._rs
                0x02de74c8 d ovl_lookup_real_one._rs
                0x02de74f0 d ovl_fh_to_parent._rs
                0x02de7518 d incfs_get_hash_alg.sha256
                0x02de7530 d incfs_fs_type
                0x02de7578 d attributes`
            }

        }
        if (p==0|| ii==0|| k==0||kp==0){
            var err=""
            if(p){
                err+="unknow command for kptools<br>"
            }
            if(ii){
                err+="unkown img<br>"
            }
            if(k){
                err+="unkown superkey<br>"
            }
            if(kp){
                err+="unkown kpimg<br>"
            }
            if (p==0&& ii==0&& k==0&&kp==0){

            }else{
                return err
            }
            
        }

        if (kpimg!="kpimg-android"){
            return "unkown kpimg"+kpimg
        }
        if (img!="kernel-b"){
            if (patched!=1){
                return "you need unpack boot"
            }
            if (img=="kernel"){
                return "use the backup kernel-b instead of kernel"
            }
            if (img=="boot.img"||img=="new-boot.img"){
                return "boot.img can not be patched"
            }
            return "unkown kernel"+img
        }
        if (patched!=1){
            return "you need unpack boot"
        }
        kptools=1
        
        term.makeFile("kernel")
        return "patch ok"

    }
};
/**
 * Prints a greeting to the user or to the given name.
 **/
customCommands.hello = {
    about: "hello [name ...]<br>&nbsp;&nbsp;Greet the user with a message.",
    exe: function (args) {                          // Executed for this command. args[0] contains the command name.
        if (args.length < 2) {
            return "Hello. Why don't you tell me your name?";
        }
        var name = "";
        for (var i = 1; i < args.length; i++) {
            name += args[i] + " ";
        }
        return "Hello " + name.trim();
    }
};

/**
 * Print a simple message.
 **/
customCommands.secret = {
    about:  "secret<br>&nbsp;&nbsp;A command that is not listed in the help.",  // Help text for this command.
    hidden: true,                                                               // Whether to hide this command from the help list.
    exe:  function() {                                                          // Executed for this command.
            return "The password is: goldfish";
    }
};

// Use the commands in this file, to extend the built-in commands:
var commands = extendObject(builtInCommands, customCommands);
