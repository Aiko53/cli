#!/usr/bin/env node

const program = require('commander')
const package = require('../package.json')
const inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo')
const path = require('path')
const ora = require('ora')
const loading = ora('正在下载...')

program.version(`@cime/cli v${package.version}`)

program.command('create')
    .description('创建模板')
    .action(async () => {
        let { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: '请输入项目名称：'
        })
        console.log("创建的项目名为：", name);
        let { template } = await inquirer.prompt({
            type: 'list',
            name: 'template',
            message: '请选择下载的项目：',
            choices: [
                {
                    name: 'admin-react',
                    value: 'https://github.com:Aiko53/react-admin'
                },
                {
                    name: 'admin-react-shop',
                    value: 'https://github.com:Aiko53/goShop'
                }
            ]
        })
        // console.log("---------正在下载：", template);
        loading.start()
        // if (template === "aaa") {
        //     let { color } = await inquirer.prompt({

        //         type: "checkbox",
        //         message: "选择颜色:",
        //         name: "color",
        //         choices: [
        //             {
        //                 name: "red"
        //             },
        //             // new inquirer.Separator(), // 添加分隔符
        //             {
        //                 name: "blur",
        //                 checked: true // 默认选中
        //             },
        //             {
        //                 name: "green"
        //             },
        //             // new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
        //             {
        //                 name: "yellow"
        //             }
        //         ]

        //     })
        //     console.log('选择的颜色为：', color);
        // }
        let dest = path.join(process.cwd(), name)
        downloadGitRepo(template, dest, function (err) {
            if(err){
                loading.fail("创建模板失败：" + err.message)
            }else{
                loading.succeed("模板创建成功！")
            }
        })

    })





program.parse(process.argv)
