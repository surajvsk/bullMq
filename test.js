const express = require('express');
const { exec } = require('child_process');


function executePowerShell(psscript) {
    exec(psscript, {
        'shell': 'powershell.exe'
    }, (error, stdout, stderr) => {
        if (error) {
            console.log('error:::::::::::::::::::::::', error)
            console.log('FILE UPLOAD LOG:::::::::::::::::::::::7', error)
            // return reject(error);
        } else if (stdout) {
            console.log('synoptic_absolute_path:::synopticss::oye balle', stdout)
            console.log('FILE UPLOAD LOG:::::::::::::::::::::::8', stdout)
            // return resolve(stdout)
            // res.status(200).json({status:200, message:`downloaded::::::::::::${qp_absolute_path}`})
        } else {
            console.log('stderrr else :::::::::::')
            console.log('FILE UPLOAD LOG:::::::::::::::::::::::9', stderr)
            // return reject(stderr);
        }
    })

}

function hello() {
    try {
        console.log('')
        const result = executePowerShell(`# Create a new Word application object
        $wordApp = New-Object -ComObject Word.Application

        # Make the application invisible (run in background)
        $wordApp.Visible = $false

        # Add a new document
        $document = $wordApp.Documents.Add()

        # Add text to the document
        $paragraph = $document.Content.Paragraphs.Add()
        $paragraph.Range.Text = "Hello, this is text written by PowerShell!"
        $paragraph.Range.InsertParagraphAfter()

        # You can add more paragraphs if needed
        $paragraph2 = $document.Content.Paragraphs.Add()
        $paragraph2.Range.Text = "This is another paragraph in the Word document."
        $paragraph2.Range.InsertParagraphAfter()

        # Define the file path where the document will be saved
        $filePath = "D:/tmp/document.docx"

        # Save the document
        $document.SaveAs([ref] $filePath)

        # Close the document and Word application
        $document.Close()
        $wordApp.Quit()

        # Release COM objects
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($paragraph) | Out-Null
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($document) | Out-Null
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($wordApp) | Out-Null
        [System.GC]::Collect()
        [System.GC]::WaitForPendingFinalizers()

        Write-Output "Word document created and saved at $filePath"
        `);

                console.log('Result', result)
            } catch (error) {
                console.log('Script execution failed', error)
    }
}

hello()


