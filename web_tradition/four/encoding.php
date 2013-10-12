<?php
$title = $_GET["title"];
$title = str_replace(" ","+",$title);
$type = $_GET["type"];
$type = strtolower($type);
$url = "http://www.allmusic.com/search/".$type."/".$title;
$html = file_get_contents($url);
if(strcmp($type, "artists") == 0) {
	doArtists($html);
}else if(strcmp($type, "albums") == 0) {
	doAlbums($html);
}else {
	doSongs($html);
}

function doArtists($html)
{
	$imageURL;
	$linkURL;
	$names;
	$genre;
	$year;
	$rows = explode("class=\"search-result artist\"",$html);
	$flag = 0;
	$length = count($rows);
	if($length > 6) {
		$length = 6;
	}
	
	for($i = 1;$i < $length; $i++) {
		if (isset($rows[$i])){
			$lineList = explode("\n", $rows[$i]);
		}
		$imageURL[$i] = "http://www-scf.usc.edu/~caoyang/artist.png";
		$genre[$i] = "N/A";
		$year[$i] = "N/A";
		for($j = 0; $j < count($lineList); $j++) {
			//print $lineList[$j];
			if(preg_match("/div class=\"cropped-image\"/", $lineList[$j])) {
				$flag = 1;
			} else if(preg_match("/div class=\"name\"/", $lineList[$j])) {
				$flag = 2;
			} else if(preg_match("/div class=\"info\"/", $lineList[$j])) {
				$flag = 3;
			}
	
			if($flag == 1) {
				if(preg_match("/(http[^\"]*)/", $lineList[$j], $match)) {
					$imageURL[$i] = $match[0];
				}
			$flag = 0;
			}else if($flag == 2) {
				if(preg_match("/(http[^\"]*)/", $lineList[$j + 1], $match)) {
			    	$linkURL[$i] = $match[0];
			    	if(preg_match("/>([^<]+)</", $lineList[$j + 1], $match)) {
				    	$names[$i] = $match[1];
				    }
				}
			$flag = 0;
			}else if($flag == 3) {
				if(preg_match("/([A-Za-z][^0-9<]+[A-Za-z])/", $lineList[$j + 1], $match)) {
			    	$genre[$i] = $match[0];
			    }else if(preg_match("/([0-9].*[0-9s])/", $lineList[$j + 1], $match)) {
				    $year[$i] = $match[0];
				}
				if(preg_match("/div/", $lineList[$j + 2])) {
				    $flag = 0;
				}
			} 	
		}
	}
	if($length == 1) {
		printEmpty();
	} else {
		printArtistXML ($length, $imageURL, $linkURL, $names, $genre, $year);
	}
}
function doAlbums($html)
{
	$imageURL;
	$linkURL;
	$artist;
	$genre;
	$year;
	$title;
	$rows = explode("class=\"search-result album\"",$html);
	$flag = 0;
	$length = count($rows);
	if($length > 6) {
		$length = 6;
	}
	
	for($i = 1;$i < $length; $i++) {
		if (isset($rows[$i])){
			$lineList = explode("\n", $rows[$i]);
		}
		$imageURL[$i] = "http://www-scf.usc.edu/~caoyang/album.png";
		$year[$i] = "N/A";
		for($j = 0; $j < count($lineList); $j++) {
			//print $lineList[$j];
			if(preg_match("/div class=\"cropped-image\"/", $lineList[$j])) {
				$flag = 1;
			} else if(preg_match("/div class=\"artist\"/", $lineList[$j])) {
				$flag = 2;
			} else if(preg_match("/div class=\"info\"/", $lineList[$j])) {
				$flag = 3;
			} else if(preg_match("/div class=\"title\"/", $lineList[$j])) {
				$flag = 4;
			}
	
			if($flag == 1) {
				if(preg_match("/(http[^\"]*)/", $lineList[$j], $match)) {
					$imageURL[$i] = $match[0];
				}
			$flag = 0;
			}else if($flag == 2) {
				if(preg_match("/(http[^\"]*)/", $lineList[$j + 1], $match)) {
			    	if(preg_match_all("/>([^<]+)</", $lineList[$j + 1], $match, PREG_PATTERN_ORDER)) {
				    	$nameList = "";
				    	for($t = 0; $t < count($match[1]); $t++) {
					    	$nameList = $nameList.$match[1][$t];
				    	}
				    	if(preg_match("/([A-Za-z].+[A-Za-z])/", $nameList, $match)) {
			    		$newNameList = $match[0];
			    	}
				    	$artist[$i] = $newNameList;	    	
				    }
				} else {
					if(preg_match("/([A-Za-z][^0-9<]+[A-Za-z])/", $lineList[$j + 1], $match)) {
			    		$artist[$i] = $match[0];
			    	}
				}
				$flag = 0;
			}else if($flag == 3) {
				if(preg_match("/([A-Za-z][^0-9<]+[A-Za-z])/", $lineList[$j + 1], $match)) {
			    	$genre[$i] = $match[0];
			    }else if(preg_match("/([0-9].*[0-9s])/", $lineList[$j + 1], $match)) {
				    $year[$i] = $match[0];
				}
				if(preg_match("/div/", $lineList[$j + 2])) {
				    if(preg_match("/([A-Za-z][^0-9<]+[A-Za-z])/", $lineList[$j + 2], $match)) {
			    		$genre[$i] = $match[0];
			    	}else if(preg_match("/([0-9].*[0-9s])/", $lineList[$j + 2], $match)) {
				    	$year[$i] = $match[0];
				    }
				    $flag = 0;
				}
			} else if($flag == 4) {
				if(preg_match("/(http[^\"]*)/", $lineList[$j + 1], $match)) {
				    $linkURL[$i] = $match[0];
				    if(preg_match("/>([^<]+)</", $lineList[$j + 1], $match)) {
				    	$title[$i] = $match[1];
				    }
			    }
				$flag = 0;
			}	 	
		}
	}
	// print
	if($length == 1) {
		printEmpty();
	} else {
		printAlbumXML ($length, $imageURL, $linkURL, $artist, $genre, $year, $title);
	}	
}
function doSongs($html)
{
	$songURL;
	$sampleURL;
	$performer;
	$composer;
	$title;
	$imageURL;
	$rows = explode("class=\"search-result song\"",$html);
	$flag = 0;
	$length = count($rows);
	if($length > 6) {
		$length = 6;
	}
	
	for($i = 1;$i < $length; $i++) {
		if (isset($rows[$i])){
			$lineList = explode("\n", $rows[$i]);
		}
		$sampleURL[$i] = "N/A";
		$composer[$i] = "N/A";
		$performer[$i] = "N/A";
		$imageURL[$i] = "http://www-scf.usc.edu/~caoyang/nosong.png";
		for($j = 0; $j < count($lineList); $j++) {
			//print $lineList[$j];
			if(preg_match("/title=\"play\ssample\"/", $lineList[$j])) {
				$flag = 1;
			} else if(preg_match("/div class=\"title\"/", $lineList[$j])) {
				$flag = 2;
			} else if(preg_match("/div class=\"info\"/", $lineList[$j])) {
				$flag = 3;
			}
			if($flag == 1) {
				if(preg_match("/(http[^\"]*)/", $lineList[$j], $match)) {
					$sampleURL[$i] = $match[0];
					$imageURL[$i] = "http://www-scf.usc.edu/~caoyang/song.png";
				}
			$flag = 0;
			}else if($flag == 2) {
				//print $lineList[$j + 1]."<br>";
				$songLink = explode("<span", $lineList[$j + 1]);
				//print $songLink[0];
				if(preg_match("/(http[^\"]*)/", $songLink[0], $match)) {
					//print $match[0].": song link<br>";
					$songURL[$i] = $match[0];
				}
				if(preg_match("/>([^<]+)</", $songLink[0], $match)) {
				    $title[$i] = str_replace("&quot;","",$match[1]);
				    //print $title[$i].": title <br>";
				}
				//print $songLink[1];
				if(isset($songLink[1])) {
					if(preg_match_all("/>([^<]+)</", $songLink[1], $match, PREG_PATTERN_ORDER)) {
					$performer[$i] = "";
					for($t = 0; $t < count($match[1]); $t++) {
						$performer[$i] = $performer[$i].$match[1][$t];
				    }
				    $performer[$i] = str_replace("by ","",$performer[$i]);
				    //print $performer[$i]."<br>";	    	
				}

				}
				$flag = 0;
			}else if($flag == 3) {
				$composerList = "";
				//print $lineList[$j + 1]."<br>";
				if(preg_match_all("/>([^<]+)</", $lineList[$j + 1], $match, PREG_PATTERN_ORDER)) {
					for($t = 0; $t < count($match[1]); $t++) {
						if(preg_match("/\//", $match[1][$t])) {
							$composerList = $composerList.$match[1][$t];
						}else if(preg_match("/\w+/", $match[1][$t])){
							$composerList = $composerList.$match[1][$t];
						}
				    }
				    $composer[$i] = str_replace("Composed by ","",$composerList);
				    //print $composer[$i]."<br>";	    	
				}
				$flag = 0;
			}
			//$flag = 0;
		}
	}
	// print
	if($length == 1) {
		printEmpty();
	} else {
		printSongXML ($length, $songURL, $sampleURL, $performer, $composer, $title, $imageURL);
	}
}

function printArtistXML ($length, $imageURL, $linkURL, $names, $genre, $year) {
	$dom = new DOMDocument("1.0","UTF-8"); 
	// display document in browser as plain text 
	// for readability purposes 
	header("Content-Type: text/xml"); 
	// create root element 
	$root = $dom->createElement("results"); 
	$dom->appendChild($root); 
	
	for($i = 1; $i < $length; $i++) {
		$result = $dom->createElement("result"); 
		//result child
		$root->appendChild($result);
		//need to add ImageLink, URLLink, name, genre, year for artist
		$attCover = $dom->createAttribute("cover"); 
		$result->appendChild($attCover); 
		// create attribute value node 
		$valueCover = $dom->createTextNode($imageURL[$i]); 
		$attCover->appendChild($valueCover); 
		// for names
		$attName = $dom->createAttribute("name"); 
		$result->appendChild($attName); 
		// create attribute value node 
		$valueName = $dom->createTextNode($names[$i]); 
		$attName->appendChild($valueName);
		// for genre
		$attGenre = $dom->createAttribute("genre"); 
		$result->appendChild($attGenre); 
		// create attribute value node 
		$valueGenre = $dom->createTextNode($genre[$i]); 
		$attGenre->appendChild($valueGenre);
		// for year
		$attYear = $dom->createAttribute("year"); 
		$result->appendChild($attYear); 
		// create attribute value node 
		$valueYear = $dom->createTextNode($year[$i]); 
		$attYear->appendChild($valueYear);
		// for urllink
		$attURL = $dom->createAttribute("details"); 
		$result->appendChild($attURL); 
		// create attribute value node 
		$valueURL = $dom->createTextNode($linkURL[$i]); 
		$attURL->appendChild($valueURL);
	}
	
	echo $dom->saveXML(); 

}

function printAlbumXML ($length, $imageURL, $linkURL, $artist, $genre, $year, $title) {
	$dom = new DOMDocument("1.0","UTF-8"); 
	// display document in browser as plain text 
	// for readability purposes 
	header("Content-Type: text/xml"); 
	// create root element 
	$root = $dom->createElement("results"); 
	$dom->appendChild($root); 
	
	for($i = 1; $i < $length; $i++) {
		$result = $dom->createElement("result"); 
		//result child
		$root->appendChild($result);
		//need to add ImageLink, URLLink, name, genre, year for artist
		$attCover = $dom->createAttribute("cover"); 
		$result->appendChild($attCover); 
		// create attribute value node 
		$valueCover = $dom->createTextNode($imageURL[$i]); 
		$attCover->appendChild($valueCover); 
		// for title
		$attTitle = $dom->createAttribute("title"); 
		$result->appendChild($attTitle); 
		// create attribute value node 
		$valueTitle = $dom->createTextNode($title[$i]); 
		$attTitle->appendChild($valueTitle); 
		// for names
		$attArtist = $dom->createAttribute("artist"); 
		$result->appendChild($attArtist); 
		// create attribute value node 
		$valueArtist = $dom->createTextNode($artist[$i]); 
		$attArtist->appendChild($valueArtist);
		// for genre
		$attGenre = $dom->createAttribute("genre"); 
		$result->appendChild($attGenre); 
		// create attribute value node 
		$valueGenre = $dom->createTextNode($genre[$i]); 
		$attGenre->appendChild($valueGenre);
		// for year
		$attYear = $dom->createAttribute("year"); 
		$result->appendChild($attYear); 
		// create attribute value node 
		$valueYear = $dom->createTextNode($year[$i]); 
		$attYear->appendChild($valueYear);
		// for urllink
		$attURL = $dom->createAttribute("details"); 
		$result->appendChild($attURL); 
		// create attribute value node 
		$valueURL = $dom->createTextNode($linkURL[$i]); 
		$attURL->appendChild($valueURL);
	}
	
	echo $dom->saveXML(); 
}

function printSongXML ($length, $songURL, $sampleURL, $performer, $composer, $title, $imageURL) {
	$dom = new DOMDocument("1.0","UTF-8"); 
	// display document in browser as plain text 
	// for readability purposes 
	header("Content-Type: text/xml"); 
	// create root element 
	$root = $dom->createElement("results"); 
	$dom->appendChild($root); 
	
	for($i = 1; $i < $length; $i++) {
		$result = $dom->createElement("result"); 
		//result child
		$root->appendChild($result);
		//need to add sample, title, performer, composer, details
		$attSample = $dom->createAttribute("sample"); 
		$result->appendChild($attSample); 
		// create attribute value node 
		$valueSample = $dom->createTextNode($sampleURL[$i]); 
		$attSample->appendChild($valueSample); 
		// for title
		$attTitle = $dom->createAttribute("title"); 
		$result->appendChild($attTitle); 
		// create attribute value node 
		$valueTitle = $dom->createTextNode($title[$i]); 
		$attTitle->appendChild($valueTitle); 
		// for performer
		$attPerformer = $dom->createAttribute("performer"); 
		$result->appendChild($attPerformer); 
		// create attribute value node 
		$valuePerformer = $dom->createTextNode($performer[$i]); 
		$attPerformer->appendChild($valuePerformer);
		// for genre
		$attComposer = $dom->createAttribute("composer"); 
		$result->appendChild($attComposer); 
		// create attribute value node 
		$valueComposer = $dom->createTextNode($composer[$i]); 
		$attComposer->appendChild($valueComposer);
		// for image
		$attImage = $dom->createAttribute("image"); 
		$result->appendChild($attImage); 
		// create attribute value node 
		$valueImage = $dom->createTextNode($imageURL[$i]); 
		$attImage->appendChild($valueImage);
		// for details link
		$attURL = $dom->createAttribute("details"); 
		$result->appendChild($attURL); 
		// create attribute value node 
		$valueURL = $dom->createTextNode($songURL[$i]); 
		$attURL->appendChild($valueURL);
	}
	
	echo $dom->saveXML(); 

}

function printEmpty () {
	$dom = new DOMDocument("1.0","UTF-8"); 
	// display document in browser as plain text 
	// for readability purposes 
	header("Content-Type: text/xml"); 
	// create root element 
	$root = $dom->createElement("results"); 
	$dom->appendChild($root); 	
	echo $dom->saveXML(); 

}


?>