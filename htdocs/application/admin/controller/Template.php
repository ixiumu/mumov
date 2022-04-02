<?php
namespace app\admin\controller;
use think\Db;

class Template extends Base
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $param = input();
        $path = $param['path'];
        $path = str_replace('\\','',$path);
        $path = str_replace('/','',$path);

        if(empty($path)){
            $path = '.@template';
        }

        if(substr($path,0,10) != ".@template") { $path = ".@template"; }
        if(count( explode(".@",$path) ) > 2) {
            $this->error(lang('illegal_request'));
            return;
        }

        $uppath = substr($path,0,strrpos($path,"@"));
        $ischild = 0;
        if ($path !=".@template"){
            $ischild = 1;
        }

        $config = config('maccms.site');
        if($param['current']==1){
            $path = '.@template@' . $config['template_dir'] .'@' . $config['html_dir'] ;
            $ischild = 0;
            $pp = str_replace('@','/',$path);
            $filters = $pp.'/*';
        }
        elseif($param['label']==1){
            $path = '.@template@' . $config['template_dir'] .'@' . $config['html_dir'] ;
            $ischild = 0;
            $pp = str_replace('@','/',$path);
            $filters = $pp.'/label/*';
        }
        elseif($param['ads']==1){
            $path = '.@template@' . $config['template_dir'] .'@' . $config['html_dir'] ;
            $ischild = 0;
            $pp = str_replace('@','/',$path);
            $filters = $pp.'/ads/*';
        }
        else{
            $pp = str_replace('@','/',$path);
            $filters = $pp.'/*';
        }

        $this->assign('curpath',$path);
        $this->assign('uppath',$uppath);
        $this->assign('ischild',$ischild);

        $num_path = 0;
        $num_file = 0;
        $sum_size = 0;
        $files = [];

        if(is_dir($pp)) {
            $farr = glob($filters);
            if ($farr) {
                foreach ($farr as $f) {

                    if(is_dir($f)) {
                            $num_path++;
                            $tmp_path = str_replace('./template/', '.@template/', $f);
                            $tmp_path = str_replace('/', '@', $tmp_path);
                            $tmp_name = str_replace($path . '@', '', $tmp_path);
                            $ftime = filemtime($f);

                            $files[] = ['isfile' => 0, 'name' => $tmp_name, 'path' => $tmp_path, 'note'=>lang('dir'), 'time' => $ftime];
                    }
                    elseif(is_file($f)) {
                        $num_file++;
                        $fsize = filesize($f);
                        $sum_size += $fsize;
                        $fsize = mac_format_size($fsize);
                        $ftime = filemtime($f);
                        $tmp_path = mac_convert_encoding($f, "UTF-8", "GB2312");

                        $path_info = @pathinfo($f);
                        $tmp_path = $path_info['dirname'];
                        $tmp_name = $path_info['basename'];

                        $files[] = ['isfile' => 1, 'name' => $tmp_name, 'path' => $tmp_path, 'fullname'=> $tmp_path.'/'.$tmp_name, 'size' => $fsize,'note'=>lang('file'), 'time' => $ftime];
                    }
                }
            }
        }
        $this->assign('sum_size',mac_format_size($sum_size));
        $this->assign('num_file',$num_file);
        $this->assign('num_path',$num_path);
        $this->assign('files',$files);

        $this->assign('title',lang('admin/template/title'));
        return $this->fetch('admin@template/index');
    }

    public function ads()
    {
        $adsdir = $GLOBALS['config']['site']['ads_dir'];
        if(empty($adsdir)){
            $adsdir='ads';
        }
        $path = './template/'.$GLOBALS['config']['site']['template_dir'].'/'.$adsdir ;
        if(!file_exists($path)){
            mac_mkdirss($path);
        }

        $filters = $path.'/*.js';
        $num_file=0;
        $sum_size=0;
        $farr = glob($filters);
        if ($farr) {
            foreach ($farr as $f) {
                if(is_file($f)) {
                    $num_file++;
                    $fsize = filesize($f);
                    $sum_size += $fsize;
                    $fsize = mac_format_size($fsize);
                    $ftime = filemtime($f);
                    $tmp_path = mac_convert_encoding($f, "UTF-8", "GB2312");

                    $path_info = @pathinfo($f);
                    $tmp_path = $path_info['dirname'];
                    $tmp_name = $path_info['basename'];

                    $files[] = ['isfile' => 1, 'name' => $tmp_name, 'path' => $tmp_path, 'fullname'=> $tmp_path.'/'.$tmp_name, 'size' => $fsize,'note'=>lang('file'), 'time' => $ftime];
                }
            }
        }
        $this->assign('curpath',$path);
        $this->assign('sum_size',mac_format_size($sum_size));
        $this->assign('num_file',$num_file);
        $this->assign('files',$files);
        $this->assign('title',lang('admin/template/ads/title'));
        return $this->fetch('admin@template/ads');
    }

    public function info()
    {
        $param = input();

        $fname = $param['fname'];
        $fpath = $param['fpath'];

        if( empty($fpath)){
            $this->error(lang('param_err').'1');
            return;
        }
        $fpath = str_replace('@','/',$fpath);
        $fullname = $fpath .'/' .$fname;
        $fullname = str_replace('\\','/',$fullname);

        if( (substr($fullname,0,10) != "./template") || count( explode("./",$fullname) ) > 2) {
            $this->error(lang('param_err').'2');
            return;
        }
        $path = pathinfo($fullname);
        if(!empty($fname)) {
            $extarr = array('html', 'htm', 'js', 'xml');
            if (!in_array($path['extension'], $extarr)) {
                $this->error(lang('admin/template/ext_safe_tip'));
                return;
            }
        }

        $filter = '<\?|php|eval|server|assert|get|post|request|cookie|session|input|env|config|call|global|dump|print|phpinfo|fputs|fopen|global|chr|strtr|pack|system|gzuncompress|shell|base64|file|proc|preg|call|ini|{:|{$|{~|{-|{+|{/';
        $this->assign('filter',$filter);

        if (Request()->isPost()) {
            $validate = \think\Loader::validate('Token');
            if(!$validate->check($param)){
                return $this->error($validate->getError());
            }

            $validate = \think\Loader::validate('Template');
            if(!$validate->check($param)){
                return $this->error($validate->getError());
            }

            $fcontent = $param['fcontent'];
            $r = mac_reg_replace($fcontent,$filter,"*");
            if($fcontent !== $r){
                $this->error(lang('admin/template/php_safe_tip'));
                return;
            }
            $res = @fwrite(fopen($fullname,'wb'),$fcontent);

            if($res===false){
                return $this->error(lang('save_err'));
            }
            return $this->success(lang('save_ok'));
        }

        $fcontent = @file_get_contents($fullname);
        $fcontent = str_replace('</textarea>','<&#47textarea>',$fcontent);
        $this->assign('fname',$fname);
        $this->assign('fpath',$fpath);
        $this->assign('fcontent',$fcontent);

        return $this->fetch('admin@template/info');
    }

    public function del()
    {
        $param = input();
        $fname = $param['fname'];
        if(!empty($fname)){
            if(!is_array($fname)){
                $fname = [$fname];
            }
            foreach($fname as $a){
                $a = str_replace('\\','/',$a);

                if( (substr($a,0,10) != "./template") || count( explode("./",$a) ) > 2) {

                }
                else{
                    $a = mac_convert_encoding($a,"UTF-8","GB2312");
                    if(file_exists($a)){ @unlink($a); }
                }
            }
        }
        return $this->success(lang('del_ok'));
    }

    public function wizard()
    {
        $this->assign('title',lang('admin/template/wizard/title'));
        return $this->fetch('admin@template/wizard');
    }

}
